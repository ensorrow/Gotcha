import UserCard from '../../components/liked/UserCard';
import { ContentCard } from '../../components/liked/Card';
import { connect } from 'dva';

const tmpUsers = [
  { avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh' },
  { avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh' },
  { avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh' },
];
const Search = ({ search }) => <div className="m-search">
  <div className="statis">共搜索到{search.users.length}名相关用户，10个相关活动</div>
  {search.users.map((item, index) => <UserCard key={index} vm={item} type="user" />)}
  <ContentCard />
</div>;

export default connect(({ app }) => ({
  search: app.search,
}))(Search);
