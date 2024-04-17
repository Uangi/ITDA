package com.itda.user.jwt;

import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    // 임의의 숫자, 문자 아무거나 (Base64로 인코딩 할거라 특수문자 안됨)
    private String secretKey = "3d12j3l1k2j3l1k2j3lmdlaskjasdasdqwlkejlk12j3lk123dl23asQWEYZAA";

    // 토큰 유효시간 30분
    private long tokenValidTime = 30 * 60 * 1000L;

    private final UserDetailsService userDetailsService;

    // 객체 초기화, secretKey를 Base64로 인코딩
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성
    public String createToken(String userEmail, String nickname, UserRole roles) {
        // claims: JWT payload에 저장되는 정보 단위 (여기서는 주제(subject) 클레임으로 사용)
        Claims claims = Jwts.claims().setSubject(userEmail);
        // 원하는 정보 put
        claims.put("nickname", nickname); // 닉네임 정보 추가
        claims.put("roles", roles); // 롤 추가
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)// 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘과 signature에 들어갈 secret 값 세팅
                .compact();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPK(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    public String getUserPK(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰에서 닉네임만 추출
    public String getUserNickname(String token) {
        return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("nickname");
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

}
