import classes from "./Home.module.css";
const Hero = () => {
  return (
    // <div className={classes.div}>
    //     <div className={classes.back}>
    //   <h1 style={{textAlign:'center',maxWidth:'50vw'}}>Ghare Ghare Bisudha Pani</h1>
    //   <p style={{textAlign:'center',maxWidth:'50vw'}}>
    //     What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
    //     and typesetting industry. Lorem Ipsum has been the industry's standard
    //     dummy text ever since the 1500s, when an unknown printer took a galley
    //     of type and scrambled it to make a type specimen book. It has survived
    //     not only five centuries, but also the leap into electronic typesetting,
    //     remaining essentially unchanged. It was popularised in the 1960s with
    //     the release of Letraset sheets containing Lorem Ipsum passages, and more
    //     recently with desktop publishing software like Aldus PageMaker including
    //     versions of Lorem Ipsum.
    //   </p>
    // </div>
    // </div>
    <div className={classes.hero}>
    
    <div className={classes.content}>
        <h1 className={classes.h1}>DHULIKONA</h1>
        <button className={classes.button} type="button">Raise Issue</button>
    </div>
    <div className={classes.about}>
        <h2>We aim at<br/> providing clean driking <br/>water to every rural <br/>household of Assam</h2>
    </div>
</div>

  );
};

export default Hero;
