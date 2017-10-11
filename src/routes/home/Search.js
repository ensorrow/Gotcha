import UserCard from '../../components/liked/UserCard';
import ActivityCard from '../../components/index/ActivityCard';
import { connect } from 'dva';
import './Search.less';

const Search = ({ search }) => <div className="m-search">
  <div className="statis">共搜索到<span>{search.users.length}</span>名相关用户，<span>{search.events.length}</span>个相关活动</div>
  <div className="users">
    {search.users.map((item, index) => <UserCard key={index} vm={item} type="user" />)}
  </div>
  <div className="events" style={{marginTop: search.users.length?'16px':'0'}}>
    {search.events.map((event, index) => <ActivityCard vm={event} key={index} />)}
  </div>
</div>;

export default connect(({ app }) => ({
  search: app.search,
}))(Search);
