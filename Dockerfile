# Use Python as the base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Install LibreTranslate
RUN pip install libretranslate

# Expose port 5000 so Render can access it
EXPOSE 5000

# Run LibreTranslate when the container starts
CMD ["libretranslate", "--host", "0.0.0.0", "--port", "5000", "--load-only", "en,zh,ru"]