import styles from './AuthorCard.less';
import Avatar from 'material-ui/Avatar';
import { Card } from 'material-ui/Card';
import LikeButton from '../common/LikeButton';

const AuthorCard = ({   } ) => <div className="authorCard">
	<div className="title">活动主</div>
	<div className="card">
		<div className="header">
			<Avatar src="http://lvzheyang.top/images/avatar.jpg" style={{float: 'left',margin: '10px'}} />
			<h1>习惯TRASH</h1>
			<h2>生活就像吃巧克力，人在吃秤在看</h2>
		</div>
		<div className="content">
			<dl>
				<div><dd>1990</dd><dt>活动数</dt></div>
				<div><dd>19900</dd><dt>关注数</dt></div>
			</dl>
			<LikeButton />
		</div>
	</div>
</div>

export default AuthorCard;