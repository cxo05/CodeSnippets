//Allocate units based on same floor
//Bonus: Side by side

//Assumptions:
//As many units on the same floor as possible first
//You only allocate the one with more side by side if the largest floors have the same number of available units
//else you will fill up the floor with the most available units

var building = [
  [1,1,1,0,1,1,1,0,1,1,1,1],
  [1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,1,1,0,0,0,1,1,1,1], //More side by side (2 groups)
  [1,0,0,1,1,1,1,1,1,0,1,1],
  [1,0,0,1,1,0,0,1,1,1,1,0], //Less side by side (3 groups)
];

//No. of units to take up
var newTenantUnits = 2;

var availableUnits = [];
var largestFloor = 0; //AKA Prefered floor
var largestFloorGroups = 0; //Groups of units (Lower is better)

//Get available units per floor
for(var f = 0; f < building.length; f++){
  var floor = building[f];
  availableUnits.push([]);
  var groups = 0;
  for(var i = 0; i < floor.length; i++){
    if(floor[i] == 0){
      availableUnits[f].push(i);
      if(floor[i + 1] == 1){
        groups++;
      }
    }
  }
  //Find floor with most units
  if(availableUnits[f].length > availableUnits[largestFloor].length){
    largestFloor = f;
    largestFloorGroups = groups;
  }
  //Floor with more side by side if both same size
  if(availableUnits[f].length == availableUnits[largestFloor].length && groups < largestFloorGroups){
    largestFloor = f;
    largestFloorGroups = groups;
  }
  console.log(availableUnits[f]);
}

allocatedUnits = [];

//Allocate from floor with most units
for(var i = newTenantUnits; i != 0; i--){
  if(availableUnits[largestFloor].length == 0){
    largestFloor = nextFloor(largestFloor);
  }
  allocatedUnits.push(String(largestFloor+1).padStart(2, "0") + "-" + String(availableUnits[largestFloor][0]+1).padStart(2, "0"));
  availableUnits[largestFloor].shift();
}

//Find next floor to give units
function nextFloor(currFloor){
  var next = currFloor;

  if(availableUnits[currFloor].length == 0){
    if(currFloor == 0){
      next++;
    } else if (currFloor == building.length - 1) {
      next--;
    } else if (availableUnits[currFloor - 1].length > availableUnits[currFloor + 1].length) {
      next--;
    } else {
      next++;
    }
  }
  //Check if next floor is full and run this again
  if(availableUnits[next].length == 0){
    return nextFloor(next);
  } else {
    return next;
  }
}

console.log(allocatedUnits);

//Limitations:
//Code fails if both the floors above and below the largest floor are full
//Code fails if floor above is full but the floors below do not have enough units. vice versa
//Solving the above will require more complex recursive functions.
//nextFloorUp() compare with nextFloorDown()

//Not optimized for finding no. of units less than the largest available unit floor. (e.g. 2 units in a floor of 5 units)
