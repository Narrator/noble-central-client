var noble = require('noble');
var schedule = require('node-schedule');


var serviceUUIDs = ['ec00']; // default: [] => all
var allowDuplicates = false; // default: false

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    console.log('started');
    noble.startScanning();
  } else {
    console.log(state);
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log(peripheral);
  if(peripheral.advertisement.serviceUuids.toString() === 'ec00') {
    console.log('Discovered peripheral ' + peripheral.advertisement.serviceUuids);
    console.log({
      time: new Date(),
      rssi: peripheral.rssi,
      host: 'kau'
    });
  }
});

var rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50];

schedule.scheduleJob(rule, function () {
  noble.stopScanning();
  noble.startScanning();
});
