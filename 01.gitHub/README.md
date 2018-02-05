1주차

gitHub

PART 1. 단일저장소에서 협업하기

1. 저장소 만들기

https://github.com/에 가입해서 New repository 생성

http://sunone22.tistory.com/28

---

마크다운

https://stackedit.io/app

  // User Model
  import { Model } from '@vuex-orm/core'

  export default class User extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'users'

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields () {
      return {
        id: this.attr(null),
        name: this.attr(''),
        email: this.attr(''),
      }
    }
  }


  // Post Model
  import { Model } from '@vuex-orm/core'
  import User from './User'

  export default class Post extends Model {
    static entity = 'posts'

    static fields () {
      // `this.belongsTo` is for belongs to relationship.
      return {
        id: this.attr(null),
        user_id: this.attr(null),
        title: this.attr(''),
        body: this.attr(''),
        published: this.attr(false),
        author: this.belongsTo(User, 'user_id')
      }
    }
  }

