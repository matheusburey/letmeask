export default class CreateRoomUseCase{
  private roomRepository: IRoomRepository

  constructor(repository: IRoomRepository){
    this.roomRepository = repository
  }

  async execute(title: string){
    const newRoom = {
      title,
      author: {
        id: "1234",
        name: "Jhon Doe",
        avatar: "",
      }
    }
    return await this.roomRepository.createRoom(newRoom)
  }
}