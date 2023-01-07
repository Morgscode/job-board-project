import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/session';
import { http } from '../../services/http';
import meService from '../../services/meService';

async function handler(req, res) {
  const { user, jwt } = req.session;

  if (!user) {
    console.log('runs');
    return res.status(401).json({ data: { message: 'not authroized' } });
  }

  http.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

  try {
    const details = await meService.index(jwt);
    req.session.user = details;
    await req.session.save();
    return res.status(200).json({ data: { user } });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ data: { message: 'not authroized' } });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
