import UserCard from '../../components/liked/UserCard';
import { connect } from 'dva';

const tmpAuthors = [
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', name: 'Jack Sparrow', summary: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', name: 'Jack Sparrow', summary: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', name: 'Jack Sparrow', summary: 'hhhhhhh'},
]
const tmpUsers = [
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', nickname: 'Jack Sparrow', subscribe: 'hhhhhhh'},
]
const FullList = ({ isAuthor=true }) => <div>
  {tmpAuthors.map((item, index) => <UserCard key={index} vm={item} org={isAuthor} />)}
</div>;

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => {},
    getAuthors: () => {}
  };
}  
export default FullList;