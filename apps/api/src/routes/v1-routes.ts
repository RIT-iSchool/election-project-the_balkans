import { router } from '../../router';
import * as elections from '../services/election-service';

router.post('/v1/elections', elections.create);
router.get('/v1/elections', elections.list);
router.get('/v1/elections/:electionId', elections.retrieve);
