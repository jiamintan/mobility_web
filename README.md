# mobility_web
Xiaoyi Wu

# Interative map
https://xiaoyi-wu0711.github.io/mobility_web/

## Introduction
As the most populous city in the United States with 8.8 million people distributed over 300.46 square miles (U.S Census Bureau, 2020), New York City has become the pandemic epicenter (Cordes & Castro, 2020) since the first confirmed case on March 1st. Especially, under the setting of holiday and Omicron variant, NYC experienced unprecedented transmission speed at 2022 New Year’s Eve. This study focuses on the spatio-temporal analysis of human mobility pattern in NYC to study COVID-19’s impact on travel behaviors, and social equity analysis in different contexts to help the government properly response to public health emergencies.

## Data
This map uses the smart-device pattern data from December to January in 2019-2020, 2020-2021, 2021-2022 from SafeGraph. In addition, this study collect ACS 2019 5-year data to analyze mobility pattern in different race and income contexts to discuss the social equity issues and make policy implications of travel restrictions for the local government. 

Instead of collecting data of ZCTA level at first, I gather the data of census tract level since this is much more precise. Here is the data source:
|     Data     | Geographic Level |           Source            | 
| :------------: | :------------------------: | :------------------------: | 
|    Mobility Pattern Data   | Block Group  |    [SafeGraph](https://www.safegraph.com/)    | 
| Core Place Data | Block Group  |     [SafeGraph](https://www.safegraph.com/)             | 
| Demographic Data e.g. median income, race | Census Tract |     [ACS 2019 5-year data](https://www.census.gov/data/developers/data-sets/acs-5year.html)       |
| Geographic boundary Data | Census Tract |   [US Census Bureau](https://www1.nyc.gov/site/planning/data-maps/open-data/census-download-metadata.page)       |  

Table 1.  Data

## Methods
- Aggravate the block group data to census tract level
- Comparing the spatial pattern of human mobility before and after COVID-19's outbreak
