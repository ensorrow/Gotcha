import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';
import Scroll from '../../components/common/Scroll';

// @TODO: org判断
const MyFollows = ({ follows, dispatch }) => {
  function moreAction(page){
    dispatch({ type: 'about/getFollows', payload: { page } })
  }
  return <Scroll moreAction={moreAction} pagination={follows.meta.pagination}>
    <div>
    {follows.data.length ? follows.data.map(user => {
      user.has_follow = true;// 接口信息有误修正
      return <UserCard vm={user} type="user" key={user.id} />
    }) : '暂无关注用户'}
    </div>
  </Scroll>;
}

export default connect(({ about }) => ({ follows: about.follows }))(MyFollows);
