import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    /** Rejestracja użytkownika
     * Tworzy użytkownika i nadaje pierwsze tokeny
     * @param createUserDto 
     * @returns tokeny dostępu
     */
    async signUp(createUserDto: CreateUserDto): Promise<any>{
        const userExists = await this.usersService.findOneByUsername(
            createUserDto.username,
        );
        if (userExists) {
            throw new BadRequestException('Użytkownik już istnieje');
        }

        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser._id, newUser.username);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        return tokens;
    }

    /** Logowanie
     *  Loguje użytkownika i aktualizuje tokeny
     * @param data 
     * @returns tokeny strategii jwt
     */
    async signIn(data: AuthDto){
        const user = await this.usersService.findOneByUsername(data.username);
        if (!user){throw new Error("Użytkownik nie istnieje")};
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches){throw new Error("Hasło jest niepoprawne")};
        const tokens = await this.getTokens(user._id, user.username);
        await this.updateRefreshToken(user._id, tokens.accessToken);
        return tokens;
    }

    /** Wylogowanie
     *  Usuwa tokeny i wylogowywuje użytkownika
     * @param userID 
     * @returns nic
     */
    async logout(userID: string){
        return this.usersService.update(userID, { refresh_token: null});
    }

    /** Funkcja hashująca dane
     *  Za pomocą biblioteki argon2 hashuje dane
     * @param data 
     * @returns zakodowany ciąg znaków
     */
    hashData(data: string){
        return argon2.hash(data);
    }

    /** Przypisanie tokenów
     *  Hashuje token i przypisuje go do obiektu użytkownika
     * @param userID 
     * @param refreshToken 
     */
    async updateRefreshToken(userID: string, refreshToken: string){
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userID, {
            refresh_token: hashedRefreshToken,
        });
    }

    /** Koder tokenów jwt
     * Zwraca accessToken i refreshToken
     * @param userID 
     * @param username 
     * @returns tokeny strategii jwt
     */
    async getTokens(userID: string, username: string){
        const userRole=await this.usersService.getRole(userID);
        console.log(userRole);
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
              {
                sub: userID,
                username,
              },
              {
                secret: 'test',
                expiresIn: '1d',
              },
            ),
            this.jwtService.signAsync(
              {
                sub: userID,
                username,
              },
              {
                secret: 'test',
                expiresIn: '15d',
              },
            ),
          ]);
        return {
            accessToken,
            refreshToken,
            userRole,
        };
    }

    /** Odświerzenie tokenów
     *  nadaje nowe tokeny użytkownikowi
     * @param userID 
     * @param refreshToken 
     * @returns tokeny strategii jwt
     */
    async refreshTokens(userID: string, refreshToken: string){
        const user = await this.usersService.findOne(userID);
        if(!user||!user.refresh_token) throw new ForbiddenException("Brak dostępu");
        const refreshTokenMatches = await argon2.verify(
            user.refresh_token,
            refreshToken,
        );
        if(!refreshTokenMatches) throw new ForbiddenException("Brak dostępu");
        const tokens = await this.getTokens(user._id, user.username);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }

    /** Pobieranie profilu
     *  Pobiera profil po jego identyfikatorze
     * @param userID 
     * @returns obiekt z danymi użytkownika
     */
    async getUserProfile(userID: string){
        return await this.usersService.findOne(userID);
    }
    
    /** Edycja profilu
     * Edytuje użytkownika i zwraca nowy obiekt
     * @param userID id użytkownika
     * @param data dane do zmiany
     * @returns dane użytkownika
     */
    async updateUserProfile(userID: string, data: UpdateUserDto){
        return await this.usersService.update(userID,data);
    }
}
