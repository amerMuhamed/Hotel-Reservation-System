class Room{
constructor(number, type, price){
this.number=number;
this.type=type;
this.price=price;
this.isAvilable=true;
}
// booking the Room
bookRoom(){
    if(this.isAvilable){
        this.isAvilable=false;
        return true;
    }
    return false;
}
// cancelling the reservation
cancelReservation(){
    if(!this.isAvilable){
        this.isAvilable=true;
        return true;
    }
    return false;
}

}
class Hotel{
    constructor(name){
     this.name=name;
     this.rooms=[];
    }

    addRoom(room){
        this.rooms.push(room);
}
getAvailableRooms(){
return this.rooms.filter(room=>room.isAvilable);
}
findAvailableRoom(type){
    return this.getAvailableRooms().find(room=>room.type==type);
}
}
class Reservation{
    constructor(hotel){
        this.hotel=hotel;
        this.reservation=[];
    }

    makeReservation(type){
       const room=this.hotel.findAvailableRoom(type);
       if(room){
        if(room.bookRoom()){
            this.reservation.push(room);
            return 'Room ${room.number} booked successfully';
        }
       }
       return 'Room ${room.number} is not available';
    
}

    cancelReservation(roomNumber){
        const room=this.reservation.find(room=>room.number==roomNumber);
        if(room){
            // that is mean i found the room
        if(room.cancelReservation()){
        this.reservation=this.reservation.filter(room=>room.number!==roomNumber);
        return 'Room $#{room.number} cancelled successfully';
        }   
    
        }
        return 'Reservation not found';

    }
    viewReservation(){
        if(this .reservation.length==0){
            return 'No Current reservation ';
        }
        return this.reservation.map(room=>`Room ${room.number} type ${room.type} price $${room.price}`).join('\n');
}
}
class RommManager{
constructor(hotel){
    this.hotel=hotel;
}
displayAvailableRooms(){
    const availableRooms=this.hotel.getAvailableRooms();
    if(availableRooms.length==0){
        return 'No rooms available';
    }
    return availableRooms.map(room=>`Room #${room.number} type $${room.type} price $${room.price}`).join('\n');
}
}
const hotel=new Hotel('Hilton');
hotel.addRoom(new Room(1,'single',100));
hotel.addRoom(new Room(2,'single',100));    
hotel.addRoom(new Room(3,'single',100));    
hotel.addRoom(new Room(4,'single',100));    
hotel.addRoom(new Room(5,'single',100));    
hotel.addRoom(new Room(6,'single',100));    
hotel.addRoom(new Room(7,'double',150));    
hotel.addRoom(new Room(8,'double',150));    
hotel.addRoom(new Room(9,'double',150));    
hotel.addRoom(new Room(10,'double',150));    
hotel.addRoom(new Room(11,'suite',150));    
hotel.addRoom(new Room(12,'suite',200));    
hotel.addRoom(new Room(13,'suite',200)); 

const reservation=new Reservation(hotel);  

const roomManager=new RommManager(hotel);

const updateReservation=()=>{
    const reservationList=document.getElementById('reservation-list');
    reservationList.textContent=reservation.viewReservation();
}   

const updateAviliableRooms=()=>{
    const availableRooms=document.getElementById('available-rooms');
    console.log(availableRooms);
    availableRooms.textContent=roomManager.displayAvailableRooms();
}
document.getElementById('booking-form').addEventListener('submit',event=>{
    event.preventDefault();
    const roomType=document.getElementById('room-type').value.split('-')[0];
    const result=reservation.makeReservation(roomType);
    updateReservation();
    updateAviliableRooms();
    alert(result);
});
document.getElementById('cancellation-form').addEventListener('submit',event=>{
    event.preventDefault();
    const roomNumber=parseInt(document.getElementById('room-number').value);
    const result=reservation.cancelReservation(roomNumber);
    updateReservation();
    updateAviliableRooms();
    alert(result);
});
updateReservation();
updateAviliableRooms();