import FlatButton from 'material-ui/FlatButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';

const LikeButton = ({ onClick }) => <FlatButton onClick={onClick} label="关注" icon={<ArrowRight />} />;

export default LikeButton;
