import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';
import Scroll from '../../components/common/Scroll';

const FullList = ({ recOrg, recUser, params, dispatch }) => {
  function moreOrg(page){
    dispatch({ type: 'liked/getRecOrg', payload: { page } })
  }
  function moreUser(page){
    dispatch({ type: 'liked/getRecUser', payload: { page } })
  }
  return <Scroll pagination={params.type === 'org' ? recOrg.meta.pagination : recUser.meta.pagination} moreAction={params.type === 'org' ? moreOrg : moreUser}>
    <div>
      {params.type === 'org' ? recOrg.data.map((item, index) => <UserCard key={index} vm={item} type={params.type} />) : recUser.data.map((item, index) => <UserCard key={index} vm={item} type={params.type} />)}
    </div>
  </Scroll>
}

export default connect(({ liked }, ownProps) => ({
  recOrg: liked.recOrg,
  recUser: liked.recUser,
  params: ownProps.params,
}))(FullList);
