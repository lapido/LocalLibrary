var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});



// AuthorSchema
// .virtual('dob')
// .get(function () {
//   return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
// });

// AuthorSchema
// .virtual('death_date')
// .get(function () {
//   return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
// });


AuthorSchema
.virtual('life_span')
.get(function () {
  if (this.date_of_birth && this.date_of_death) 
  	return moment(this.date_of_birth).format('YYYY-MM-DD') + ' - '+ moment(this.date_of_death).format('YYYY-MM-DD')
  else if(this.date_of_birth)
  	return moment(this.date_of_birth).format('YYYY-MM-DD');
  else
  	return '';
});




//Export model
module.exports = mongoose.model('Author', AuthorSchema);