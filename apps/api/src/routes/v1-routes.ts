import { Router } from 'express';
import * as elections from '../services/election-service';

const router = Router();

router.put('/v1/elections', elections.create);
