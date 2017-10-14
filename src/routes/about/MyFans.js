import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';
import Scroll from '../../components/common/Scroll';

const MyFans = ({ fans, dispatch }) => {
  function moreAction(page){
    dispatch({ type: 'about/getFans', payload: { page } })
  }
  return <Scroll moreAction={moreAction} pagination={fans.meta.pagination}>
    <div>
      {fans.data.length ? fans.data.map(user => <UserCard vm={user} type="user" key={user.id} />) : '暂无粉丝'}
    </div>
  </Scroll>;
}

export default connect(({ about }) => ({ fans: about.fans }))(MyFans);
