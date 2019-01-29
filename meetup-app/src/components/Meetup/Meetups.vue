<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-sm2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/paris-cityscape-overview-guide-xlarge.jpg"
                  height="125px"
                  contain
                >
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h5 class="white--text mb-0">
                        My Meetup
                      </h5>
                      <div>
                        17th july 2017
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-action>
                    <v-btn flat to="/meetup/1">
                      <v-icon left>
                        arrow_forward
                      </v-icon>
                      View Meetup
                    </v-btn>
                  </v-card-action>
                </v-flex>
              <v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
