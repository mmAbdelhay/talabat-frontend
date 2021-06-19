import React , {Component} from "react";
import SimpleReactFooter from "simple-react-footer";
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        
        const title = "Talabatk";
        const columns = [
          {
              title: "Resources",
              resources: [
                  {
                      name: "FAQ",
                      link: "/faq"
                  },
                  {
                      name: "FeedBack",
                      link: "/feedback"
                  },
                  {
                      name: "Contact Us",
                      link: "/contactus"
                  },
                  
              ]
          },
          {
              title: "Legal",
              resources: [
                  {
                      name: "Privacy",
                      link: "/privacy"
                  },
                  {
                      name: "Terms & conditions",
                      link: "/terms"
                  }
              ]
          },
        
       ];
       return <SimpleReactFooter 
          
          title={title}
          columns={columns}
          linkedin=""
          facebook=""
          twitter=""
          instagram=""
          youtube=""
          pinterest=""
          copyright="talabatk"
          iconColor="white"
          backgroundColor="#262626"
          fontColor="white"
          copyrightColor="white"
          
       />;
      };
}
 
export default Footer;