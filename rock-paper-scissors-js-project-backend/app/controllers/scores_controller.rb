class ScoresController < ApplicationController

    def index
        scores = Score.all
        render json: ScoreSerializer.new(scores)
    end

    def show
        score = Score.find(params[:id])
        render json: ScoreSerializer.new(score)
    end

end