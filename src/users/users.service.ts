import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,) { }

  /** Utwórz użytkownika
   * Tworzy użytkownika w panelu administratorskim
   * @param createUserDto Dane użytkownika
   * @returns Obiekt użytkownika
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  /** Lista uzytkowników
   *  Pobiera listę użytkowników z bazy
   * @returns lista użytkowników
   */
  async findAll() {
    return this.userModel.find().populate('roles');
  }

  /** Lista uczniów
   *  Pobiera listę użytkowników o randze uczeń
   * @returns lista użytkowników
   */
  async findAllStudents() {
    return this.userModel.find({ roles: { $in: ["student"] } });
  }

  /** Lista Nauczycieli
   *  Pobiera listę użytkowników o randze nauczyciel
   * @returns lista użytkowników
   */
  async findAllTeachers() {
    return this.userModel.find({ roles: { $in: ["teacher"] } });
  }

  /** Lista Rodziców
   *  Pobiera listę użytkowników o randze rodzic
   * @returns lista użytkowników
   */
  async findAllParents() {
    return this.userModel.find({ roles: { $in: ["parent"] } });
  }


  /** Wyszukiwanie użytkownika
   *  Zwraca użytkownika po jego _id
   * @param id identyfikator
   * @returns obiekt użytkownika
   */
  async findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  /** Wyszukiwanie użytkownika po jego nazwie
   *  Wyszukuje użytkownika po username
   * @param username nazwa użytkownika
   * @returns obiekt użytkownika
   */
  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }

  /** Aktualizacja danych użytkownika
   *  Aktualizuje dane użytkownika o danym _id
   * @param id identyfikator
   * @param updateUserDto nowe dane
   * @returns obiekt użytkownika
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (user.password != updateUserDto.password) {
        updateUserDto.password = await this.hashData(updateUserDto.password);
      }
    } catch (error) { };
    return this.userModel.findOneAndUpdate({ _id: id }, { $set: { ...updateUserDto } });
  }

  /** Usuwanie użytkownika
   *  Usuwa użytkownika o podanym _id
   * @param id identyfikator
   * @returns tak/nie
   */
  async remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }

  /** Koder danych
   *  Koduje dane za pomocą biblioteki argon2
   * @param data dane do hashowania
   * @returns zahashowane dane
   */
  hashData(data: string) {
    return argon2.hash(data);
  }

  /** Dodanie adresu
   *  Dodaje adres do danego użytkownika
   * @param id identyfikator użytkownika
   * @param createAddressDto adres
   * @returns dane użytkownika
   */
  async addAddress(id: string, createAddressDto: CreateAddressDto) {
    const user = await this.findOne(id);
    user.address.push(createAddressDto);
    user.save();
    return user;
  }

  /** Aktualizacja adresu
   *  Aktualizuje dane adresu danego użytkownika
   * @param id identyfikator użytkownika
   * @param id2 identyfikator adresu
   * @param createAddressDto nowe dane
   * @returns dane użytkownika
   */
  async updateAddress(id: string, id2: number, createAddressDto: CreateAddressDto) {
    const user = await this.findOne(id);
    user.address[id2] = createAddressDto;
    user.save();
    return user;
  }

  /** Usuwanie adresu
   *  Usuwa adres danego użytkownika
   * @param id identyfikator użytkownika
   * @param id2 identyfikator adresu
   * @returns tak/nie
   */
  async removeAddress(id: string, id2: number) {
    const user = await this.findOne(id);
    user.address.splice(id2, 1);
    user.save();
    return user;
  }
  async getRole(id: string) {
    const user = await this.userModel.findOne({ _id: id }).select("roles first_name last_name _id");
    return user;
  }
}
