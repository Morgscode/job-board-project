const { DataTypes } = require('sequelize');
const moment = require('moment');
const db = require('../utils/db');
const { Job } = require('./jobModel');
const { User } = require('./userModel');
const { JobApplicationStatus } = require('./jobApplicationStatusModel');
const app = require('../app');

const JobApplication = db.sequelize.define(
  'JobApplication',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    JobApplicationStatusId: {
      type: DataTypes.INTEGER,
      references: {
        model: JobApplicationStatus,
        key: 'id',
      },
    },
    JobId: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: 'id',
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    coveringLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // TODO - FileUpload Model
    // cvId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: CV,
    //     key: 'id',
    //   },
    // },
  },
  {
    tableName: 'jb_job_applications',
    paranoid: true,
  }
);

/**
 * A model specific update function which will prepare user input for db insertion
 * @param {object} application - the data 
 * @param {obejct} where - the sql where clause
 * @returns Object
 */
async function _update(application, where) {
  if ('id' in application) delete application.id;
  if ('JobId' in application) delete application.JobId;
  if ('UserId' in application) delete application.UserId;
  if ('coveringLetter' in application) delete application.coveringLetter;
  return await JobApplication.update(application, { where });
}

module.exports = { JobApplication, _update };