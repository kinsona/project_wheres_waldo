class PlayersController < ApplicationController

  def update
    @player = Player.find(params[:id])

    if @player.update(name_params)

      respond_to do |format|
        format.json { render :json => @player, :status => 200 }
      end

    else
      respond_to do |format|
        format.json { render :nothing => true, :status => :unprocessable_entity }
      end

    end
  end


  private

    def name_params
      params.require(:player).permit(:name);
    end

end
