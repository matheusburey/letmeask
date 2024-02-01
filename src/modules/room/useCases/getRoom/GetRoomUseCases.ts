export default class GetRoomUseCase{
  private roomRepository: IRoomRepository

  constructor(repository: IRoomRepository){
    this.roomRepository = repository
  }

  async execute(roomId: string){
    return await this.roomRepository.getRoom(roomId)
  }
}