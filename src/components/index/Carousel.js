import Slider from 'react-slick'
import styles from './Carousel.less';

const settings = {
	dots: true,
	slidesToShow: 1,
	arrows: false,
	dotsClass: 'dots',
	autoplay: true
};

const Carousel = ({ props = settings } ) => <Slider {...props}>
	  <div><img src='http://placekitten.com/g/400/200' /></div>
    <div><img src='http://placekitten.com/g/400/200' /></div>
    <div><img src='http://placekitten.com/g/400/200' /></div>
	</Slider>;

export default Carousel;