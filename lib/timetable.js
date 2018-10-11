
class Timetable {

  constructor (data, id){

    this.timetable = new Map();
    this.keys = [];
    this.name= '';
    this.lines = new Set();
    this._load(data);
    this.id = id;
  }

  _load(data){
    this.name = data.stops[0].name;

    let stopTimes = data.stops[0].stoptimesForServiceDate;
    for (let i = 0; i < stopTimes.length; i++){

      let service = stopTimes[i];
      for (let j=0; j< service.stoptimes.length; j++ ){

        let scheduledDeparture = service.stoptimes[j].scheduledDeparture;
        let shortName = service.pattern.route.shortName;

        if (this.timetable.has(scheduledDeparture)){
          this.timetable.get(scheduledDeparture).push(shortName);
        }else {
          this.keys.push(scheduledDeparture);
          this.timetable.set(scheduledDeparture, [shortName]);
          this.lines.add(shortName);
        }

      }

    }

    return this;

  }


  toJSON(){

    var result = {
      title: this.name,
      id: this.id,
      lines: Array.from(this.lines).sort(),
      timetable: []
    };

    this.timetable.forEach( (value, key) => {
      result.timetable.push({
        time: key,
        lines: value
      });

    });


    return result;

  }


  sort(){
    let sortedMap = new Map();

    this.keys
    .sort((a, b) => a-b )
    .forEach((key) => {
      sortedMap.set(key, this.timetable.get(key));
    });

    this.timetable = sortedMap;
    return this;
  }

}



module.exports = Timetable;
