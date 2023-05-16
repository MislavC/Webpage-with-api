/**
 * Project 2 - Using jQuery To Consume a Web Service
 * ISTE-340-800
 * Mislav Čuljak
 */

import {Model}      from './Model/Model.js';
import {View}       from './View/View.js';
import {Controller} from './Controller/Controller.js';

const app = new Controller(new Model(), new View());