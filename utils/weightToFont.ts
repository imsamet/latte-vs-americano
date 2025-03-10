import { FontFamilys, FontWeights } from '../core/_model';

const WeightToFont = (weight?: FontWeights): FontFamilys => {
  return weight === '900'
    ? 'Poppins-Black'
    : weight === '800'
    ? 'Poppins-ExtraBold'
    : weight === '700'
    ? 'Poppins-Bold'
    : weight === '600'
    ? 'Poppins-SemiBold'
    : weight === '500'
    ? 'Poppins-Medium'
    : weight === '400'
    ? 'Poppins-Regular'
    : weight === '300'
    ? 'Poppins-Light'
    : weight === '200'
    ? 'Poppins-ExtraLight'
    : weight === '100'
    ? 'Poppins-Thin'
    : 'Poppins-Regular';
};

export default WeightToFont;
