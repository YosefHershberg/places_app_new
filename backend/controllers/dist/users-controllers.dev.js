"use strict";

var _require = require('uuid'),
    uuidv4 = _require.v4;

var bcrypt = require('bcryptjs');

var HttpError = require('../models/http-error');

var _require2 = require('express-validator'),
    body = _require2.body,
    validationResult = _require2.validationResult;

var User = require('../models/user');

var jwt = require('jsonwebtoken');

var expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 1;

var getUsersList = function getUsersList(req, res, next) {
  var users, error;
  return regeneratorRuntime.async(function getUsersList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find({}, '-password'));

        case 3:
          users = _context.sent;
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          error = new HttpError('Fetching failed. Try again later', 500);
          return _context.abrupt("return", next(error));

        case 10:
          res.status(200).json({
            users: users.map(function (u) {
              return u.toObject({
                getters: true
              });
            })
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var signup = function signup(req, res, next) {
  var errors, _req$body, name, email, password, image, existingUser, error, hashedPassword, _error, newUser, _error2, token, _error3;

  return regeneratorRuntime.async(function signup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 4;
            break;
          }

          console.log(errors);
          return _context2.abrupt("return", next(new HttpError('Invalid inputs passed, please check your data.', 422)));

        case 4:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, image = _req$body.image;
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          existingUser = _context2.sent;
          _context2.next = 16;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](5);
          console.log(_context2.t0);
          error = new HttpError('Failed to check if user is already signed in, please try again later', 500);
          return _context2.abrupt("return", next(error));

        case 16:
          if (!existingUser) {
            _context2.next = 18;
            break;
          }

          return _context2.abrupt("return", next(new HttpError('This email is already used. plaese try again or log in', 422)));

        case 18:
          _context2.prev = 18;
          _context2.next = 21;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 21:
          hashedPassword = _context2.sent;
          _context2.next = 28;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t1 = _context2["catch"](18);
          _error = new HttpError("could not creat user. please try again", 500);
          return _context2.abrupt("return", next(_error));

        case 28:
          newUser = new User({
            name: name,
            email: email,
            hashedPassword: hashedPassword,
            // image: req.file.path,
            image: image,
            places: []
          });
          _context2.prev = 29;
          _context2.next = 32;
          return regeneratorRuntime.awrap(newUser.save());

        case 32:
          _context2.next = 39;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t2 = _context2["catch"](29);
          _error2 = new HttpError('Something went wrong. Could not create user', 500);
          console.log(_context2.t2);
          return _context2.abrupt("return", next(_error2));

        case 39:
          _context2.prev = 39;
          token = jwt.sign({
            userId: newUser.id,
            email: newUser.email
          }, process.env.JWT_KEY, {
            expiresIn: "".concat(expirationTime, "h")
          });
          _context2.next = 48;
          break;

        case 43:
          _context2.prev = 43;
          _context2.t3 = _context2["catch"](39);
          _error3 = new HttpError('Something went wrong. Could not create token', 500);
          console.log(_context2.t3);
          return _context2.abrupt("return", next(_error3));

        case 48:
          res.cookie('access_token', token, {
            maxAge: expirationTime * 60 * 60000,
            httpOnly: true
          });
          res.status(201).json({
            user: newUser.toObject({
              getters: true
            }),
            token: token
          });

        case 50:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 11], [18, 24], [29, 34], [39, 43]]);
};

var login = function login(req, res, next) {
  var _req$body2, email, password, existingUser, error, isValidPassword, _error4, token, _error5;

  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context3.sent;
          _context3.next = 12;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          error = new HttpError('Failed to check if user is has account, please try again later', 500);
          return _context3.abrupt("return", next(error));

        case 12:
          if (existingUser) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", next(new HttpError('Invalid credentials, please re-enter email and password', 403)));

        case 14:
          isValidPassword = false;
          _context3.prev = 15;
          _context3.next = 18;
          return regeneratorRuntime.awrap(bcrypt.compare(password, existingUser.hashedPassword));

        case 18:
          isValidPassword = _context3.sent;
          _context3.next = 25;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t1 = _context3["catch"](15);
          _error4 = new HttpError('Could not log you in. Please check your credetials', 500);
          return _context3.abrupt("return", next(_error4));

        case 25:
          if (isValidPassword) {
            _context3.next = 27;
            break;
          }

          return _context3.abrupt("return", next(new HttpError('Invalid credentials, please re-enter email and password', 403)));

        case 27:
          _context3.prev = 27;
          token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
          }, process.env.JWT_KEY, {
            expiresIn: "".concat(expirationTime, "h")
          });
          _context3.next = 36;
          break;

        case 31:
          _context3.prev = 31;
          _context3.t2 = _context3["catch"](27);
          _error5 = new HttpError('Something went wrong. Could not create token', 500);
          console.log(_context3.t2);
          return _context3.abrupt("return", next(_error5));

        case 36:
          res.cookie('access_token', token, {
            maxAge: expirationTime * 60 * 60000,
            httpOnly: true
          });
          res.status(200).json({
            user: existingUser.toObject({
              getters: true
            }),
            token: token
          });

        case 38:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7], [15, 21], [27, 31]]);
};

exports.getUsersList = getUsersList;
exports.signup = signup;
exports.login = login;