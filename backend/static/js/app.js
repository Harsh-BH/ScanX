$(document).ready(function() {
    // Event handler for the predict (face detection) form submission
    $('#predict-form').on('submit', function(event) {
        event.preventDefault();

        var fileInput = $('#file-input')[0];
        var formData = new FormData();

        // If a file is selected, add it to the form data
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        $('#result').html('Processing face detection...');

        $.ajax({
            url: '/predict',  // Predict route in your Flask backend
            type: 'POST',
            data: formData,
            contentType: false,  // Important: Let jQuery automatically set the Content-Type
            processData: false,  // Important: Don't process the formData
            success: function(response) {
                var resultHtml = '';

                // Display Face Detection Results
                if (response.face_detection) {
                    resultHtml += '<h2>Face Detection Result</h2>';
                    resultHtml += '<p>Prediction: ' + response.face_detection.prediction + '</p>';
                    resultHtml += '<p>Confidence: ' + response.face_detection.confidence + '%</p>';
                    resultHtml += '<p>Total Faces Analyzed: ' + response.face_detection.total_faces_analyzed + '</p>';
                }

                $('#result').html(resultHtml);
            },
            error: function(xhr, status, error) {
                var errorMessage = 'An error occurred: ';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage += xhr.responseJSON.error;
                } else {
                    errorMessage += error;
                }
                $('#result').html('<p style="color:red;">' + errorMessage + '</p>');
            }
        });
    });

    // Event handler for the analyze (code analysis) form submission
    $('#analyze-form').on('submit', function(event) {
        event.preventDefault();

        var codeInput = $('#code-input').val();
        var referenceCodes = $('#reference-codes').val().split('\n');
        var aiCodes = $('#ai-codes').val().split('\n');

        var formData = {
            'code': codeInput,
            'reference_codes': referenceCodes,
            'ai_codes': aiCodes
        };

        $('#result').html('Processing code analysis...');

        $.ajax({
            url: '/analyze',  // Analyze route in your Flask backend
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',  // Set the request content type to JSON
            success: function(response) {
                var resultHtml = '';

                // Display Code Analysis Results
                if (response.code_analysis) {
                    resultHtml += '<h2>Code Analysis</h2>';
                    resultHtml += '<p>Plagiarized: ' + (response.code_analysis.is_plagiarized ? 'Yes' : 'No') + '</p>';
                    resultHtml += '<p>Plagiarism Score: ' + response.code_analysis.plagiarism_score + '</p>';
                    resultHtml += '<p>AI-Generated: ' + (response.code_analysis.is_ai_generated ? 'Yes' : 'No') + '</p>';
                    resultHtml += '<p>AI Similarity Score: ' + response.code_analysis.ai_similarity_score + '</p>';
                }

                $('#result').html(resultHtml);
            },
            error: function(xhr, status, error) {
                var errorMessage = 'An error occurred: ';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage += xhr.responseJSON.error;
                } else {
                    errorMessage += error;
                }
                $('#result').html('<p style="color:red;">' + errorMessage + '</p>');
            }
        });
    });
});

// Function to plot the confidence chart (for face detection)
function plotConfidenceChart(details) {
    if (!details || details.length === 0) {
        return;
    }

    var labels = details.map(function(frameInfo) {
        return frameInfo.timestamp + 's';
    });
    var data = details.map(function(frameInfo) {
        return frameInfo.confidence;
    });

    // Destroy previous chart instance if it exists
    if (window.confidenceChart) {
        window.confidenceChart.destroy();
    }

    var ctx = document.getElementById('confidenceChart').getContext('2d');
    window.confidenceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Confidence Level (%)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                lineTension: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Confidence (%)'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (s)'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
