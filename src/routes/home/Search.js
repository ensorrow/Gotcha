import UserCard from '../../components/liked/UserCard';
import ActivityCard from '../../components/index/ActivityCard';
import { connect } from 'dva';

const Search = ({ search }) => <div className="m-search">
  <div className="statis">共搜索到{search.users.length}名相关用户，{search.events.length}个相关活动</div>
  {search.users.map((item, index) => <UserCard key={index} vm={item} type="user" />)}
  {search.events.map((event, index) => <ActivityCard vm={event} key={index} />)}
</div>;

export default connect(({ app }) => ({
  search: app.search,
}))(Search);
