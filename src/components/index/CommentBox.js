import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import './CommentBox.less';

const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon />
  </IconButton>
);

const CommentBox = ({ comments }) => <div className="m-comment u-card">
	<h1 className="u-title">活动评价</h1>
	<List>
		{comments.map((comment, index) => <ListItem
			leftAvatar={<Avatar src="http://lvzheyang.top/images/avatar.jpg" />}
			rightIconButton={iconButtonElement}
			primaryText="Brendan Lim"
			secondaryText={
				<p>
					{comment}
				</p>
			}
			secondaryTextLines={2}
			key={index}
		/>)}
	</List>
</div>

export default CommentBox;