import UserCard from '../../components/liked/UserCard';
import { ContentCard } from '../../components/liked/Card';

const tmpUsers = [
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh'},
]
const Search = () => <div className="m-search">
  <div className="statis">共搜索到4名相关用户，10个相关活动</div>
  {tmpUsers.map((item, index) => <UserCard key={index} vm={item} />)}
  <ContentCard />
</div>

export default Search;