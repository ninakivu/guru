const
  express = require('express')
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  ejsLayouts = require('express-ejs-layouts'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser')
