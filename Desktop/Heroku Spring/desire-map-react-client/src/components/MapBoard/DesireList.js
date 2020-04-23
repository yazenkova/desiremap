import React, { Component } from "react";
import DesireItem from "./Desires/DesireItem";
import wealth from "./public/wealth.png";
import realisation from "./public/self-realisation.png";
import love from "./public/love.png";
import family from "./public/family.png";
import self from "./public/self.png";
import creativity from "./public/creativity.png";
import knowledge from "./public/knowledge.png";
import career from "./public/career.png";
import travelling from "./public/travelling.png";

class DesireList extends Component {
  render() {
    const { desires_prop } = this.props;

    const tasks = desires_prop.map((desire) => (
      <DesireItem key={desire.id} desire={desire} />
    ));

    let wealthItems = [];
    let selfRealizationItems = [];
    let loveItems = [];
    let familyItems = [];
    let selfItems = [];
    let creativityItems = [];
    let knowledgeItems = [];
    let careerItems = [];
    let travellingItems = [];

    for (let i = 0; i < tasks.length; i++) {
      switch (tasks[i].props.desire.tag) {
        case 1:
          wealthItems.push(tasks[i]);
          break;
        case 2:
          selfRealizationItems.push(tasks[i]);
          break;
        case 3:
          loveItems.push(tasks[i]);
          break;
        case 4:
          familyItems.push(tasks[i]);
          break;
        case 5:
          selfItems.push(tasks[i]);
          break;
        case 6:
          creativityItems.push(tasks[i]);
          break;
        case 7:
          knowledgeItems.push(tasks[i]);
          break;
        case 8:
          careerItems.push(tasks[i]);
          break;
        case 9:
          travellingItems.push(tasks[i]);
          break;
        default:
          continue;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <img className="card-img-top" src={wealth} alt="wealth" />
              <div className="card-body">{wealthItems}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img
                  className="card-img-top"
                  src={realisation}
                  alt="self-realisation"
                />
                <div className="card-body">{selfRealizationItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img className="card-img-top" src={love} alt="love" />
                <div className="card-body">{loveItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img className="card-img-top" src={family} alt="family" />
                <div className="card-body">{familyItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img className="card-img-top" src={self} alt="self" />
                <div className="card-body">{selfItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img
                  className="card-img-top"
                  src={creativity}
                  alt="creativity"
                />
                <div className="card-body">{creativityItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img className="card-img-top" src={knowledge} alt="knowledge" />
                <div className="card-body">{knowledgeItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img className="card-img-top" src={career} alt="career" />
                <div className="card-body">{careerItems}</div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card text-center mb-2">
                <img
                  className="card-img-top"
                  src={travelling}
                  alt="travelling"
                />
                <div className="card-body">{travellingItems}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DesireList;
