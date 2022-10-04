import styles from "./Temp.module.scss";

export const Temp = () => {
  return (
    <div class="con_map">
    <ul class="con_map_left">
        
        <p>주소<span>1공장 : 대구광역시 동구 동호로 7길 58 1층</span></p>
        <p>TEL<span>053-964-2101</span></p>
        <p>FAX<span>053-964-2105</span></p>
        <p>E-mail<span>moon2173@hanmail.net</span></p>
        <p>moon5087@naver.com</p>
    </ul>
    <ul class="con_map_right">
        <p class="img"><img src="img/map_2.png" alt=""></p>
        <span>2공장 : 서울특별시 중구 마른내로 72, 914호</span>
    </ul>
</div>
  )
};
