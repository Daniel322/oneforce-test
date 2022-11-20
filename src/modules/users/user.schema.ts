import * as dynamoose from 'dynamoose';

export const userSchema = new dynamoose.Schema({
  id: {
    type: Number,
    required: true,
    // hashKey: true,
    // index: {
    //   type: 'global',
    //   rangeKey: 'dateJoined',
    //   name: 'dateRangeIndex',
    //   project: true,
    // },
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'user',
    index: {
      rangeKey: 'dateJoined',
      project: true,
    },
  },
  dateJoined: {
    type: Number,
    // index: {
    //   type: 'global',
    //   rangeKey: 'id',
    //   name: 'dateIndex',
    //   project: true,
    // },
  },
  gender: {
    type: String,
    required: true,
    enum: [
      'Female',
      'Genderfluid',
      'Male',
      'Polygender',
      'Bigender',
      'Agender',
      'Non-binary',
      'Genderqueer',
    ],
  },
});
