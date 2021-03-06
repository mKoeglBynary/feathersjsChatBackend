import crypto from 'crypto';
import createApplication, { Params } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { UserData} from "../../interfaces/userData";

const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60';



export class Users extends Service<UserData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  patch(id: number | string | null, data: Partial<UserData>, params?: createApplication.Params): Promise<UserData[] | UserData> {
    return super.patch(id, data);
  }

  create (data: UserData, params?: Params) {
    const { email, password, githubId, language} = data;
    //const hash = crypto.createHash('md5').update(email.toLocaleLowerCase()).digest('hex');
    const randInt = Math.round(Math.random() * 200 + 200);
    const avatar = `https://picsum.photos/${randInt}`;
    // const avatar = ${gravatarUrl}/${hash}?${query};

    const userData = {
      email,
      password,
      githubId,
      avatar,
      language
    };

    return super.create(userData, params);
  }
};
