const KRW = Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

export const formatPrice = (value) => KRW.format(value);

const NumberFormat = Intl.NumberFormat('ko-KR');

export const formatNumber = (value) => NumberFormat.format(value);
