const should = require('chai').should();
const fs = require('fs');

const Timetable = require('../lib/timetable.js');



describe('timetable', function (){
  let body = null;

  beforeEach(function() {
    body = JSON.parse(fs.readFileSync('./test/data.json', 'utf8'));
  });



  it('load', function (){
    let times = new Timetable(body.data, '1234').sort().toJSON();

    times.timetable[0].time.should.equal(23160);
    times.timetable[0].lines[0].should.equal('66K');

    times.timetable[15].time.should.equal(104700);
    times.timetable[15].lines[0].should.equal('67N');

    times.id.should.equal('1234');
  });

});
