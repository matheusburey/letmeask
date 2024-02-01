import { Db, ObjectId } from "mongodb";

export default class RoomRepository implements IRoomRepository {
  private repository: Db;

  constructor(repository: any) {
    this.repository = repository
  }

  async getRoom(roomId: string): Promise<any> {
    return await this.repository.collection("Rooms").findOne({ _id: new ObjectId(roomId) })
  }
  async createRoom(data: any): Promise<any> {
    const { insertedId } = await this.repository.collection("Rooms").insertOne(data)
    return await this.getRoom(insertedId.toString())
  }
}