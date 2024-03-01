import { Router } from 'express';
import * as elections from './src/services/election-service';

export const router = Router();

router.post('/v1/elections', elections.create);
router.get('/v1/elections', elections.list);
router.get('/v1/elections/:electionId', elections.retrieve);
