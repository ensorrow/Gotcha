import Slider from 'react-slick';
import styles from './Carousel.less';

const settings = {
  dots: true,
  slidesToShow: 1,
  dotsClass: 'dots',
  autoplay: true,
};

const defaultImgs = [
  'http://placekitten.com/g/400/200',
  'http://placekitten.com/g/400/200',
  'http://placekitten.com/g/400/200',
];

const Carousel = ({ imgs }) => {
  imgs = imgs.length > 0 ? imgs : defaultImgs.map((item, index) => { return { image_url: item }; });
  return (<Slider {...settings} className="carousel">
    {imgs.map((item, index) => <div key={index}><img src={item.image_url} /></div>)}
  </Slider>);
};

export default Carousel;
