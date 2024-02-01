interface IRoomRepository {
  getRoom(roomId: string): Promise<any>
  createRoom(data: any): Promise<any>
}