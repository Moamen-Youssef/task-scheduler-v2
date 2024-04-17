import styled from 'styled-components';

function Landing() {
  const StyledLandingCover = styled.div`
    background-image: url('../../public/background.jpeg');
    height: 100vh;
    background-size: cover;
    background-position: center;
    height: 100vh;
    z-index: -1;
  `;
  const LandingText = styled.h1`
    color: var(--color-grey-600);
    text-align: center;
    font-weight: 800;
    padding-top: 1.5rem;
    letter-spacing: 1px;
    width: 90%;
    margin: auto;
    line-height: 1.5;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  `;

  return (
    <StyledLandingCover className='text-5xl '>
      <LandingText>Streamline your day with our task scheduler</LandingText>
    </StyledLandingCover>
  );
}

export default Landing;
