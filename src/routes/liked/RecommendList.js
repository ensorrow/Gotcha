import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';

const FullList = ({ recOrg, recUser, params }) => <div>
  {params.type === 'org' ? recOrg.map((item, index) => <UserCard key={index} vm={item} type={params.type} />) : recUser.map((item, index) => <UserCard key={index} vm={item} type={params.type} />)}
</div>;

export default connect(({ liked }, ownProps) => ({
  recOrg: liked.recOrg,
  recUser: liked.recUser,
  params: ownProps.params
}))(FullList);
