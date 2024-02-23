import { Router } from 'express';
import * as elections from '../services/election-service';

const router = Router();

router.post('/v1/elections', elections.create);
router.get('/v1/elections', elections.list);
router.get('/v1/elections/:electionId', elections.retrieve);
