// src/App.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import Plot from "react-plotly.js";
import "bootstrap/dist/css/bootstrap.min.css";
import MRIViewer from "./MRIViewer"; // Import MRIViewer
import "./App.css"; // Custom CSS for further styling

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // Mapping class names from dataset
  const classNames = {
    "Mild Demented": { label: "Mild Demented", color: "#ffcc00" },
    "Moderate Demented": { label: "Moderate Demented", color: "#ff3300" },
    "Non Demented": { label: "Non Demented", color: "#33cc33" },
    "Very Mild Demented": { label: "Very Mild Demented", color: "#ffcc99" },
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    // Simulate file upload and prediction
    console.log("File uploaded:", selectedFile);

    // Simulated prediction based on the dataset labels
    const simulatedPrediction = simulatePrediction(selectedFile);
    setPredictionResult(simulatedPrediction);
  };

  // Simulated prediction logic
  const simulatePrediction = (file) => {
    const randomIndex = Math.floor(
      Math.random() * Object.keys(classNames).length
    );
    const predictedClass = Object.keys(classNames)[randomIndex];

    return {
      prediction: predictedClass,
      confidence: `${Math.floor(Math.random() * 100)}%`,
    };
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-4 app-container">
      <h1 className="text-center mb-4 text-primary">
        Alzheimer's Detection Dashboard
      </h1>

      <Row className="justify-content-center mb-5 w-100">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Form className="text-center">
                <Form.Group>
                  <Form.Label className="font-weight-bold text-dark">
                    Upload MRI Scan
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    className="mb-3"
                  />
                </Form.Group>
                <Button
                  className="mt-3 btn-primary btn-lg"
                  onClick={handleFileUpload}
                >
                  Predict Alzheimer's
                </Button>
              </Form>

              {predictionResult && (
                <div className="mt-4 text-center">
                  <h4 className="text-success">
                    Prediction: {predictionResult.prediction}
                  </h4>
                  <p className="text-muted">
                    Confidence: {predictionResult.confidence}
                  </p>
                  <div
                    className="badge"
                    style={{
                      backgroundColor:
                        classNames[predictionResult.prediction]?.color,
                    }}
                  >
                    {classNames[predictionResult.prediction]?.label}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5 w-100">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body className="d-flex justify-content-center">
              {selectedFile && <MRIViewer file={selectedFile} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center w-100">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body className="d-flex justify-content-center">
              <Plot
                data={[
                  {
                    x: Object.keys(classNames),
                    y: [10, 12, 5, 8], // Placeholder values (replace with real data)
                    type: "bar",
                    marker: {
                      color: Object.values(classNames).map((cls) => cls.color),
                    },
                  },
                ]}
                layout={{
                  title: "Brain Region Atrophy",
                  xaxis: { title: "Categories" },
                  yaxis: { title: "Count" },
                }}
                className="w-100"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
