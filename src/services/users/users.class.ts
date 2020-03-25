import crypto from 'crypto';
import { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { UserData} from "../../interfaces/userData";

const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60';



export class Users extends Service<UserData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  create (data: UserData, params?: Params) {
    const { email, password, githubId} = data;
    const hash = crypto.createHash('md5').update(email.toLocaleLowerCase()).digest('hex');
    const avatar = `${gravatarUrl}/${hash}?${query}`;

    const userData = {
      email,
      password,
      githubId,
      avatar
    };

    return super.create(userData, params);
  }
};
